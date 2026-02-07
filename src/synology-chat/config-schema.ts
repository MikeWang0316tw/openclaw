import { z } from "zod";

const DmPolicySchema = z.enum(["open", "allowlist", "pairing", "disabled"]);
const GroupPolicySchema = z.enum(["open", "allowlist", "disabled"]);

const SynologyChatGroupConfigSchema = z
  .object({
    enabled: z.boolean().optional(),
    allowFrom: z.array(z.union([z.string(), z.number()])).optional(),
    requireMention: z.boolean().optional(),
    systemPrompt: z.string().optional(),
    skills: z.array(z.string()).optional(),
  })
  .strict();

const SynologyChatAccountConfigSchema = z
  .object({
    enabled: z.boolean().optional(),
    nasIncomingWebhookUrl: z.string().url().optional(),
    webhookUrl: z.string().url().optional(), // Keep for backward compatibility
    token: z.string().optional(),
    botName: z.string().optional().default("openclaw"),
    incomingWebhookPath: z.string().optional().default("/synology-chat"),
    port: z.number().optional(), // Add port configuration option
    name: z.string().optional(),
    allowFrom: z.array(z.union([z.string(), z.number()])).optional(),
    groupAllowFrom: z.array(z.union([z.string(), z.number()])).optional(),
    dmPolicy: DmPolicySchema.optional().default("pairing"),
    groupPolicy: GroupPolicySchema.optional().default("allowlist"),
    mediaMaxMb: z.number().optional(),
    groups: z.record(z.string(), SynologyChatGroupConfigSchema.optional()).optional(),
  })
  .strict();

export const SynologyChatConfigSchema = z
  .object({
    enabled: z.boolean().optional(),
    nasIncomingWebhookUrl: z.string().url().optional(),
    webhookUrl: z.string().url().optional(), // Keep for backward compatibility
    channelAccessToken: z.string().optional(), // Rename to be more specific
    botName: z.string().optional().default("openclaw"),
    incomingWebhookPath: z.string().optional().default("/synology-chat"),
    port: z.number().optional(), // Add port configuration option
    verificationToken: z.string().optional(), // Add verification token for webhook validation
    name: z.string().optional(),
    allowFrom: z.array(z.union([z.string(), z.number()])).optional(),
    groupAllowFrom: z.array(z.union([z.string(), z.number()])).optional(),
    dmPolicy: DmPolicySchema.optional().default("pairing"),
    groupPolicy: GroupPolicySchema.optional().default("allowlist"),
    mediaMaxMb: z.number().optional(),
    accounts: z.record(z.string(), SynologyChatAccountConfigSchema.optional()).optional(),
    groups: z.record(z.string(), SynologyChatGroupConfigSchema.optional()).optional(),
  })
  .strict();

export type SynologyChatConfigSchemaType = z.infer<typeof SynologyChatConfigSchema>;
