import { Router } from 'express';
import Joi from 'joi';
import { container } from 'tsyringe';

import { Category } from '../entities/Category';
import { CategoryService } from '../services/CategoryService';
import { CategoryResponseDTO, CreateCategoryDTO } from '../dtos/CategoryDTOs';
import { BadRequestException } from '../../../core/AppError';
import { ApiResponse } from '../../../interfaces/ApiResponse';

const router = Router();
const categoryService = container.resolve(CategoryService);

const categorySchema = Joi.object<CreateCategoryDTO>({
  name: Joi.string().max(255).required(),
  description: Joi.string().optional(),
});

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category
 *                 example: Electronics
 *               description:
 *                 type: string
 *                 description: The description of the category
 *                 example: Devices and gadgets
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request
 * 
 *   get:
 *     summary: Retrieve a list of categories
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CategoryResponseDTO'
 */

// Create a new category
router.post(
  '/',
  async (req, res) => {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    const category = await categoryService.createCategory(req.body);
    const response: ApiResponse<CategoryResponseDTO> = {
      success: true,
      message: 'Category created successfully',
      data: category,
      status_code: 201,
    };
    res.status(201).json(response);
  }
);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Retrieve a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the category
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *       404:
 *         description: Category not found
 * 
 *   put:
 *     summary: Update a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the category
 *                 example: Updated Electronics
 *               description:
 *                 type: string
 *                 description: The updated description of the category
 *                 example: Updated description
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 * 
 *   delete:
 *     summary: Delete a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the category
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */

// Get all categories
router.get(
  '/',
  async (req, res) => {
    const categories = await categoryService.getAllCategories();
    const response: ApiResponse<CategoryResponseDTO[]> = {
      success: true,
      message: 'Categories retrieved successfully',
      data: categories,
      status_code: 200,
    };
    res.json(response);
  }
);

// Get a category by ID
router.get(
  '/:id',
  async (req, res) => {
    const category = await categoryService.getCategoryById(Number(req.params.id));

    const response: ApiResponse<CategoryResponseDTO> = {
      success: true,
      message: 'Category retrieved successfully',
      data: category,
      status_code: 200,
    };
    res.status(200).json(response);
  }
);

// Update a category
router.put(
  '/:id',
  async (req, res) => {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    const category = await categoryService.updateCategory(Number(req.params.id), req.body);
    const response: ApiResponse<CategoryResponseDTO> = {
      success: true,
      message: 'Category updated successfully',
      data: category,
      status_code: 200,
    };
    res.json(response);
  }
);

// Delete a category
router.delete(
  '/:id',
  async (req, res) => {
    await categoryService.deleteCategory(Number(req.params.id));
    const response: ApiResponse<null> = {
      success: true,
      message: 'Category deleted successfully',
      data: null,
      status_code: 204,
    };
    res.status(204).json(response);
  }
);

export default router;