import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireUser } from "@/lib/auth-middleware";

export const explainPick = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(
    z.object({
      title: z.string().max(200),
      subject: z.string().max(40),
      priority: z.string().max(10),
      dueText: z.string().max(40),
      estimate: z.number().max(1000),
      available: z.number().max(1000),
    })
  )
  .handler(async ({ data, context }) => {
    const prompt = `You are Timewise, a warm, encouraging study buddy for students. In 2 short friendly sentences (max 45 words, no markdown, at most one emoji), explain why this task is the best use of the student's ${data.available} free minutes right now.
Task: "${data.title}" (${data.subject}), priority ${data.priority}, ${data.dueText}, about ${data.estimate} minutes.`;
    const text = await context
      .getBase44()
      .asServiceRole.integrations.Core.InvokeLLM({ prompt });
    return { text: String(text).slice(0, 400) };
  });

// Time Buddy chat: the student's own tasks and goals are read with the caller's
// access rules, then handed to the built-in AI as context.
export const askBuddy = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(
    z.object({
      message: z.string().min(1).max(600),
      history: z
        .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(1200) }))
        .max(8)
        .optional(),
    })
  )
  .handler(async ({ data, context }) => {
    const api = context.getBase44();
    const [taskPage, goalPage] = await Promise.all([
      api.entities.Task.list({ sort: "-created_date", limit: 50 }),
      api.entities.Goal.list({ sort: "-created_date", limit: 20 }),
    ]);

    const open = taskPage.items.filter((t) => t.status !== "done");
    const taskLines = open.slice(0, 12).map(
      (t) =>
        `- "${t.title}" (${t.subject || "Other"}, ${t.priority || "medium"} priority, about ${t.estimated_minutes || 25} min${t.due_date ? `, due ${t.due_date}` : ""})`
    );
    const goalLines = goalPage.items.map(
      (g) => `- "${g.title}" (${g.term === "long" ? "long" : "short"}-term${g.target_date ? `, target ${g.target_date}` : ""})`
    );
    const transcript = (data.history || [])
      .map((m) => `${m.role === "user" ? "Student" : "Time Buddy"}: ${m.content}`)
      .join("\n");

    const prompt = `You are Time Buddy, the soft, encouraging study companion inside the "timewise" planner. You help one student plan study sessions, choose what to work on and feel calm about their workload. Today is ${new Date().toISOString().slice(0, 10)}.

Their open tasks:
${taskLines.length ? taskLines.join("\n") : "- (none yet)"}

Their goals:
${goalLines.length ? goalLines.join("\n") : "- (none yet)"}
${transcript ? `\nRecent conversation:\n${transcript}\n` : ""}
Answer their newest message in 2-4 short, friendly sentences (under 80 words), plain text, no markdown. Refer to their real tasks or goals when useful, offer gentle time-boxed steps, and stay warm. Never invent tasks they don't have.

Student: ${data.message}`;

    const text = await api.asServiceRole.integrations.Core.InvokeLLM({ prompt });
    return { text: String(text).slice(0, 900) };
  });