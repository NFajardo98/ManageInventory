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
    inventory: [InventoryColumnType];
    collections: [CollectionType];
    allergens: [string];
    price: number;
    expense: number;
    createdAt: Date;
    updatedAt: Date;
  };
  
  type UserType = {
    clerkId: string;
    favorites: [string];
    createdAt: string;
    updatedAt: string;
  };
  
  type OrderType = {
    shippingAddress: Object;
    _id: string;
    customerClerkId: string;
    products: [OrderItemType]
    shippingRate: string;
    totalAmount: number
  }
  
  type OrderItemType = {
    product: ProductType;
    allergens: [string];
    title: string;
    _id: string;
  }