class DonationsController < ApplicationController
  def new
    @campaign = Campaign.find_by id: params[:campaign_id]
    @donation = Donation.new
    @donate = true
  end

  def create
    @campaign = Campaign.find_by id: donation_params[:campaign_id]
    @donation = Donation.new donation_params
    @donate = true
    if @donation.save
      customer = Stripe::Customer.create email: donation_params[:email],
                                         card: params[:stripeToken]
      Stripe::Charge.create customer: customer,
                            amount: donation_params[:amount].to_i * 100,
                            description: "Elevate Africa Campaign Donation", currency: "usd"
      if @campaign
        flash[:success] = "Thanks for helping these adventurers out!"
        redirect_to @campaign
      else
        flash[:success] = "Thanks for helping us out!"
        redirect_to root_path
      end
    else
      render "new"
    end
  rescue Stripe::CardError => e
    flash[:error] = e.message
    puts "CardError! #{e.message}"
    redirect_to new_donation(campaign: @campaign.id)
  end

  def show
    @campaign = Campaign.find(params[:campaign_id])
    @donation = @campaign.donations.find(params[:id])
  end


  private
    def donation_params
      params.require(:donation).permit(:name, :email, :amount, :campaign_id)
    end
end
