export type TossPaymentConfig = {
  clientKey?: string;
  secretKey?: string;
  webhookSecret?: string;
  successUrl: string;
  failUrl: string;
  readyForClient: boolean;
  readyForServer: boolean;
  readyForWebhookHmac: boolean;
  mode: "test" | "live" | "fallback";
};

export function getTossPaymentConfig(): TossPaymentConfig {
  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
  const secretKey = process.env.TOSS_SECRET_KEY;
  const webhookSecret = process.env.TOSS_WEBHOOK_SECRET;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const mode = clientKey && secretKey ? (clientKey.includes("live") ? "live" : "test") : "fallback";

  return {
    clientKey,
    secretKey,
    webhookSecret,
    successUrl: `${siteUrl}/payments/success`,
    failUrl: `${siteUrl}/payments/fail`,
    readyForClient: Boolean(clientKey),
    readyForServer: Boolean(secretKey),
    readyForWebhookHmac: Boolean(webhookSecret),
    mode,
  };
}

export function getTossReadinessMessage(config = getTossPaymentConfig()) {
  if (!config.readyForClient) {
    return "NEXT_PUBLIC_TOSS_CLIENT_KEY가 없어 실제 결제 위젯 대신 안내 UI를 표시합니다.";
  }

  if (!config.readyForServer) {
    return "TOSS_SECRET_KEY가 없어 결제 승인/취소 API는 준비 중 상태로 유지됩니다.";
  }

  return "Toss Payments 클라이언트/서버 키가 준비되었습니다.";
}

export function shouldStorePaymentSecret() {
  return false;
}
