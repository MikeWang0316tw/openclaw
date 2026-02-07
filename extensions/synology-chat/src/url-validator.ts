export function validateNasIncomingWebhookUrl(url: string | undefined): string | null {
  if (!url?.trim()) {
    return "NAS Incoming Webhook URL is required";
  }

  try {
    const parsed = new URL(url);

    // 基本驗證
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return "NAS Incoming Webhook URL must use HTTP or HTTPS";
    }

    if (!parsed.hostname) {
      return "NAS Incoming Webhook URL must have a hostname";
    }

    return null; // 驗證通過
  } catch (error) {
    return "Invalid URL format";
  }
}

// 同時保留原函數以向後兼容
export function validateWebhookUrl(url: string | undefined): string | null {
  return validateNasIncomingWebhookUrl(url);
}

// 從配置載入時的驗證
export function loadAndValidateNasIncomingWebhookUrl(
  config: any,
  accountId: string,
): string | null {
  // 直接從配置中提取 nasIncomingWebhookUrl (優先) 或 webhookUrl (向後兼容)
  const synologyChatConfig = config.channels?.["synology-chat"];
  let accountConfig: any;

  if (accountId === "default" || accountId === "main") {
    accountConfig = synologyChatConfig;
  } else {
    accountConfig = synologyChatConfig?.accounts?.[accountId];
  }

  // 優先使用 nasIncomingWebhookUrl，否則使用 webhookUrl
  const url = accountConfig?.nasIncomingWebhookUrl || accountConfig?.webhookUrl;

  const error = validateNasIncomingWebhookUrl(url);
  if (error) {
    console.error(`[Synology Chat] Invalid NAS incoming webhook URL: ${error}`);
    return null;
  }

  return url!;
}

// 向後兼容的函數
export function loadAndValidateWebhookUrl(config: any, accountId: string): string | null {
  return loadAndValidateNasIncomingWebhookUrl(config, accountId);
}
