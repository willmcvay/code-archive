class MixesController < ApplicationController

before_filter :authenticate
  def index
    @mixes = Mix.all
  end

  def show
    @mix = Mix.find(params[:id])
  end

  def new
    @mix = Mix.new
  end

  def edit
    @mix = Mix.find(params[:id])
  end

  def create
    @mix = Mix.new(params[:mix])
    @mix.save
    redirect_to mixes_path
  end

  def update
    @mix = Mix.find(params[:id])
    @mix.update_attributes(params[:mix])
    @mix.save
    redirect_to mixes_path
  end

  def destroy
    @mix = Mix.find(params[:id])
    @mix.destroy
    redirect_to mixes_path
  end
end
