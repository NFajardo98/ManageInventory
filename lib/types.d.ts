type CollectionType = {
    _id: string;
    title: string;
    products: number;
    image: string;
  };
  
type ProductType = {
    _id: string;
    title: string;
    description: string;
    media: [string];
    collections: [CollectionType];
    inventories: {
      inventory: InventoryColumnType; // Referencia al inventario
      quantity: number; // Cantidad asociada
    }[];
    allergens: [string];
    price: number;
    expense: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  type UserType = {
    clerkId: string;
    favorites: [string];
    createdAt: string;
    updatedAt: string;
  };
  
  type OrderType = {
    _id: string;
    customerClerkId: string;
    products: [OrderItemType];
    totalAmount: number;
    table: number;
  }
  
  type OrderItemType = {
    product: ProductType;
    allergens: [string];
    quantity: number;
    title: string;
    _id: string;
  }