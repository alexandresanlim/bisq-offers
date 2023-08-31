export default interface Offer {
    offer_id: string;
    offer_date: number;
    direction: string;
    min_amount: string;
    amount: string;
    price: string;
    volume: string;
    payment_method: string;
    offer_fee_txid?: any;
  }