class ScoresController < ApplicationController

	 def index
  
    		@scores = Score.all

    		respond_to do |format|
    			format.js { render :json => @scores}
    		end
  	end

	def show
	  	@score = Score.find(params[:id])
	  		respond_to do |format|
		      		# format.html
		      		format.json { render json: @score }
		      		format.js
	 		end
	 end

	def create
		@score = Score.new(params[:score])
	    		respond_to do |format|
	    			@score.save
	    			format.json { render json: @score, status: :created, location: @score }
	    			format.js  
	    		end
	end
end
