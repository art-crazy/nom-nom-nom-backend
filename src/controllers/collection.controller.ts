import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CollectionService } from '../services/collection.service';
import { Collection } from '../entities/collection.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Collections')
@Controller('collections')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  @ApiOperation({ summary: 'Get all collections' })
  @ApiResponse({ status: 200, description: 'Returns a list of all active collections' })
  async findAll(): Promise<Collection[]> {
    return this.collectionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get collection by ID' })
  @ApiResponse({ status: 200, description: 'Returns a collection by ID' })
  @ApiResponse({ status: 404, description: 'Collection not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Collection> {
    return this.collectionService.findOne(id);
  }
} 