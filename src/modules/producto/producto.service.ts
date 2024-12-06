import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {
  constructor(@InjectRepository(Producto) private productoRepository: Repository<Producto>) {}

  // Query Builder helper
  queryBuilder(alias: string) {
    return this.productoRepository.createQueryBuilder(alias);
  }

  // Create a new product
  async create(createProductoDto: CreateProductoDto) {
    const nuevoProducto = this.productoRepository.create(createProductoDto);
    return await this.productoRepository.save(nuevoProducto);
  }

  // Retrieve all products
  async findAll() {
    return await this.productoRepository.find();
  }

  // Retrieve a single product by ID
  async findOne(id: number) {
    const producto = await this.productoRepository.findOne({ where: { id } });
    if (!producto) {
      throw new HttpException(`Producto con ID ${id} no encontrado`, HttpStatus.NOT_FOUND);
    }
    return producto;
  }

  // Update an existing product
  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = await this.productoRepository.findOne({ where: { id } });
    if (!producto) {
      throw new HttpException(`Producto con ID ${id} no encontrado`, HttpStatus.NOT_FOUND);
    }
    const productoActualizado = Object.assign(producto, updateProductoDto);
    return await this.productoRepository.save(productoActualizado);
  }

  // Delete a product by ID
  async remove(id: number) {
    const producto = await this.productoRepository.findOne({ where: { id } });
    if (!producto) {
      throw new HttpException(`Producto con ID ${id} no encontrado`, HttpStatus.NOT_FOUND);
    }
    return await this.productoRepository.remove(producto);
  }
}
