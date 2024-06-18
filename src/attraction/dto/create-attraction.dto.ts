import { ApiProperty } from '@nestjs/swagger';
export class CreateAttractionDto {
    @ApiProperty({
        example: "John",
        required: true
    })
    name: string;

    @ApiProperty({
        example:"https://www.melivecode.com/attractions/1.jpg",
        required: true
    })
    coverimage:string;

    @ApiProperty({
        example:'Phi Phi Islands are a group of islands in Thailand between the large island of Phuket and the Malacca Coastal Strait of Thailand.',
        required: true
    })
    detail:string;

    @ApiProperty({
        example: 7.89,
        required: true
    })
    latitude:number;

    @ApiProperty({
        example: 98.39,
        required: true
    })
    longitude:number;
}
