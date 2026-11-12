export const formatNaira = (kobo: number) =>
  "₦" + (kobo / 100).toLocaleString("en-NG", { maximumFractionDigits: 0 });

export const perBottle = (totalKobo: number, pack: number) =>
  formatNaira(Math.round(totalKobo / pack));
