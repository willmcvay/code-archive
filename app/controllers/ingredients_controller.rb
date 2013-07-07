class RecipesController < ApplicationController

  def  index
    @ingredients = Ingredient.all
  end

  def new
    @ingredient = Ingredient.new
  end

  def show
    @ingredient = Ingredient.find(params[:id])
  end

  def create
    @ingredient =  Ingredient.new(params[:ingredient])
    @ingredient.save
    redirect_to ingredients_path
  end

  def edit
    @ingredient = Ingredient.find(params[:id])
  end

  def update
    @ingredient = Ingredient.find(params[:id])
    @ingredient.update_attributes(params[:ingredient])
    @ingredient.save
    redirect_to ingredients_path
  end

  def destroy
    @ingredient = Ingredient.find(ingredients[:id])
    @ingredient.destroy
    redirect_to ingredient_path
  end
end