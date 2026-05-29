import crypto from "node:crypto";

import { getTossPaymentConfig, shouldStorePaymentSecret } from "@/lib/payments/toss/config";

export type TossWebhookEvent = {
  eventType?: string;
  createdAt?: string;
  data?: {
    paymentKey?: string;
    orderId?: string;
    status?: string;
    totalAmount?: number;
    secret?: string;
  };
};

export type ProcessWebhookInput = {
  rawBody: string;
  signature?: string | null;
  expectedAmount?: number;
};

export type ProcessWebhookResult = {
  ok: boolean;
  event?: TossWebhookEvent;
  verifiedBy: "hmac" | "payment-query-api-required" | "rejected";
  shouldQueryPaymentApi: boolean;
  shouldStorePaymentSecret: boolean;
  reason?: string;
};

function verifyHmac(rawBody: string, signature: string, secret: string) {
  const digest = crypto.createHmac("sha256", secret).update(rawBody).digest("base64");
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

export async function processTossWebhook({
  rawBody,
  signature,
  expectedAmount,
}: ProcessWebhookInput): Promise<ProcessWebhookResult> {
  const config = getTossPaymentConfig();
  let event: TossWebhookEvent;

  try {
    event = JSON.parse(rawBody) as TossWebhookEvent;
  } catch {
    return {
      ok: false,
      verifiedBy: "rejected",
      shouldQueryPaymentApi: false,
      shouldStorePaymentSecret: shouldStorePaymentSecret(),
      reason: "웹훅 JSON 파싱 실패",
    };
  }

  if (event.data?.secret) {
    // Toss payment.secret은 원문 저장하지 않는다. 필요 시 단방향 해시/만료 검증만 사용한다.
  }

  if (expectedAmount !== undefined && event.data?.totalAmount !== undefined && event.data.totalAmount !== expectedAmount) {
    return {
      ok: false,
      event,
      verifiedBy: "rejected",
      shouldQueryPaymentApi: true,
      shouldStorePaymentSecret: shouldStorePaymentSecret(),
      reason: "웹훅 금액이 주문 금액과 일치하지 않습니다.",
    };
  }

  if (config.readyForWebhookHmac && signature) {
    const verified = verifyHmac(rawBody, signature, config.webhookSecret!);
    return {
      ok: verified,
      event,
      verifiedBy: verified ? "hmac" : "rejected",
      shouldQueryPaymentApi: !verified,
      shouldStorePaymentSecret: shouldStorePaymentSecret(),
      reason: verified ? undefined : "웹훅 HMAC 검증 실패",
    };
  }

  return {
    ok: Boolean(event.data?.paymentKey && event.data?.orderId),
    event,
    verifiedBy: "payment-query-api-required",
    shouldQueryPaymentApi: true,
    shouldStorePaymentSecret: shouldStorePaymentSecret(),
    reason: "웹훅 secret/signature가 없어 Toss Payment Query API 재검증이 필요합니다.",
  };
}
