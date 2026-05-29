export type TossSuccessParams = {
  paymentKey?: string;
  orderId?: string;
  amount?: string | number;
};

export type TossValidationResult = {
  ok: boolean;
  paymentKey?: string;
  orderId?: string;
  amount?: number;
  reason?: string;
};

export function validateTossSuccessParams(
  params: TossSuccessParams,
  expectedAmount?: number,
): TossValidationResult {
  const paymentKey = params.paymentKey?.toString().trim();
  const orderId = params.orderId?.toString().trim();
  const amount = Number(params.amount);

  if (!paymentKey) {
    return { ok: false, reason: "paymentKey가 없습니다." };
  }

  if (!orderId) {
    return { ok: false, reason: "orderId가 없습니다." };
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    return { ok: false, paymentKey, orderId, reason: "amount가 올바르지 않습니다." };
  }

  if (expectedAmount !== undefined && amount !== expectedAmount) {
    return {
      ok: false,
      paymentKey,
      orderId,
      amount,
      reason: `결제 금액 불일치: expected=${expectedAmount}, actual=${amount}`,
    };
  }

  return { ok: true, paymentKey, orderId, amount };
}

export function buildTossConfirmPayload(result: TossValidationResult) {
  if (!result.ok || !result.paymentKey || !result.orderId || !result.amount) {
    return null;
  }

  return {
    paymentKey: result.paymentKey,
    orderId: result.orderId,
    amount: result.amount,
  };
}
