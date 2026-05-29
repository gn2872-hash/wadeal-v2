import { getTossPaymentConfig } from "@/lib/payments/toss/config";

export type TossCancelRequest = {
  paymentKey: string;
  cancelReason: string;
  cancelAmount?: number;
};

export async function prepareTossCancel(request: TossCancelRequest) {
  const config = getTossPaymentConfig();

  if (!config.readyForServer) {
    return {
      ok: false,
      fallback: true,
      message: "TOSS_SECRET_KEY가 없어 실제 Toss cancel API 호출은 보류됩니다.",
      request,
    };
  }

  return {
    ok: true,
    fallback: false,
    endpoint: `https://api.tosspayments.com/v1/payments/${request.paymentKey}/cancel`,
    request,
  };
}
