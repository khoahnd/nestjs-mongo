import { ApiProperty } from '@nestjs/swagger';

/**
 * @class
 * @public
 * @name MetadataRespone
 * @description Metadata respone DTO.
 */
export class MetadataRespone {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  totalPages: number;
}
