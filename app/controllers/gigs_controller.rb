class GigsController < ApplicationController

  def index
    @gigs = Gig.all.asc(:created_at).page params[:page]
  end
end