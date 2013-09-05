class GigsController < ApplicationController

  def index
    @gigs = Gig.asc(:created_at)
  end
end