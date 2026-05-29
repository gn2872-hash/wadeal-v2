export const currency = new Intl.NumberFormat("ko-KR");

export function formatWon(value: number) {
  return `${currency.format(value)}원`;
}
