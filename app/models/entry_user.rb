class EntryUser < ActiveRecord::Base
  
  belongs_to :user
  belongs_to :entry

  attr_accessible :archive, :entry_id, :favourite, :read, :user_id

end
