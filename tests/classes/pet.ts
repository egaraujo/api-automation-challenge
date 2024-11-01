import { Category } from './category';
import { Tag } from './tag';

export class Pet {
    id: number;
    category: Category;
    name: string;
    photoUrls: string[];
    tags: Tag[];
    status: string;
}
