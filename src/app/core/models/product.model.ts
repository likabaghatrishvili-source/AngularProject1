export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;      // url ან assets path
  category: string;   // მაგალითად: "სათამაშოები"
  description: string;
  inStock?: boolean;
}
