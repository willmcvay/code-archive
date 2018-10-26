class Ability
 include CanCan::Ability

 def initialize(user)
  user ||= User.new
  if user.role? "admin"
   can :manage, :all
  else
   can :create, User
   can :create, Recipe
   can :create, Ingredient

  end
 end
end
