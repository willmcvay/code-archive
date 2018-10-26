class Score
  include Mongoid::Document
  include Mongoid::Timestamps
  field :winnernamestored, type: String
  field :winnerscorestored, type: String
end