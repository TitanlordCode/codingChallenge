export interface CardItemType { 
  id: number,
  author: string,
  title: string,
  dateAdded: string,
  images: Array<CartItemImage>,
  likes: number,
}

export interface CartItemImage {
  portrait: string[]
  landscape: string[]
}

export interface Order {
  value: number,
  label: string,
  entity: string,
  direction: string,
  selected: boolean,
}

export interface Filter {
  searchString: string,
  onlyCurrentYear: boolean,
}