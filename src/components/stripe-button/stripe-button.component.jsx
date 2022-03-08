import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51Kb49VDWPwusOAk7wUH5wEr7SobWzcQw50HSvqSZFmkBcvfteJ4DPvyAybpSFqZEOouiMJhsNsxYYa1rsiTulylQ00Nlh8lwG7";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg4OOxMOitpvbSyEw3fKWRoNVcnGnU5klwBg&usqp=CAU"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
