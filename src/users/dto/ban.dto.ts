import { ApiProperty } from '@nestjs/swagger';

export class BanDto {
    @ApiProperty({ example: 'Span', description: 'Ban reason' })
    readonly banReason: string;
    @ApiProperty({ example: 1, description: 'User Id' })
    readonly userId: number;
}