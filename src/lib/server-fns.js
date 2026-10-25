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
    const prompt = `You are Moment, a warm, encouraging study buddy for students. In 2 short friendly sentences (max 45 words, no markdown, at most one emoji), explain why this task is the best use of the student's ${data.available} free minutes right now.
Task: "${data.title}" (${data.subject}), priority ${data.priority}, ${data.dueText}, about ${data.estimate} minutes.`;
    const text = await context
      .getBase44()
      .asServiceRole.integrations.Core.InvokeLLM({ prompt });
    return { text: String(text).slice(0, 400) };
  });