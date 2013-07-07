class RecipesController < ApplicationController

  def  index
    @recipes = Recipe.all
  end

  def new
    @recipe = Recipe.new
  end

  def show
    @recipe = Recipe.find(params[:id])
  end

  def create
    @recipe =  Recipe.new(params[:recipe])
    @recipe.save
    redirect_to recipes_path
  end

  def edit
    @recipe = Recipe.find(params[:id])
  end

  def update
    @recipe = Recipe.find(params[:id])
    @recipe.update_attributes(params[:recipe])
    @recipe.save
    redirect_to recipes_path
  end

  def destroy
    @recipe = Recipe.find(recipes[:id])
    @recipe.destroy
    redirect_to recipe_path
  end
end