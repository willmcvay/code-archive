class Ability
 include CanCan::Ability

 def initialize(user)
  user ||= User.new
  if user.role? :moderator
   can :manage, :all
elsif user.role? :artist
    can :read, :all
    can :create, Artist
    can :create, Comment
    can :create, Mix
    can :manage, Mix do |mix|
        user == mix.artist.user
    end
    can :create, Mix
    can [:show, :edit, :update, :destroy], Artist do |artist|
        user == artist.user
    end
else
   can :read, :all
   can :create, Comment
   can :create, User
  end
 end
end
