class Recipe < ActiveRecord::Base
  attr_accessible :food_type, :name, :steps
end
