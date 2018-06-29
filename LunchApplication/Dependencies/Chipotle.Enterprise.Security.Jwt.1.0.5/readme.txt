--------------------------------------------
Chipotle.Enterprise.Security.Jwt
--------------------------------------------

Configuration:

In order to use this nuget package, you first need to configure
the package to find the signing and decryption keys.  If you know
these keys, you can supply them to the package using the
JwtSecurity.InitializeWithKeys() method.

Otherwise, you can pull them from the Customer Auth service using
the JwtSecurity.InitializeWithServiceAsync() method.

The following items should be added the App.config or Web.config in
the <appsettings> section:

CustomerAuthUrl - (required unless using JwtSettings)  This is the
    URL to the Customer Auth service.  This is required if you plan on
	obtaining keys from customer service or using the ValidateLoggedInAsync()
	method.
CustomerAuthUsername - (required unless using JwtSettings)  This is 
    the username for basic authentication against the customer auth
	service for obtaining keys or validating login.
CustomerAuthPassword - (required unless using JwtSettings)  This is
    the password for basic authentication against the customer auth
	service for obtaining keys or validating login.
CustomerAuthSubscriptionKey - (required unless using JwtSettings) This
    is the subscription key for calling through the gateway.
CustomerAuthJwtKeysPath - (optional) The end-point in customer auth
    for getting keys.  If not specified, defaults to:
	"v1/customerauth/jwtkeys".
CustomerAuthIsLoginPath - (optional) The end-point in customer auth
    that checks if the specified jwt user is logged in.  If not
	specified, defaults to: "v1/customerauth/isLoggedIn?jwt={jwt}"
	where {jwt} is the JWT that will be supplied.

Using the Library:

Before calling the methods on JwtSecurity, it needs to be initialized
by calling InitializeWithKeys() or InitializeWithServiceAsync().  This
only needs to be done once for the application.

If you've setup the the CustomerAuthUrl, CustomerAuthUsername, and
CustomerAuthPassword configuration app settings, this is as easy as
calling:

JwtSecurity.InitializeWithServiceAsync();

You can get all claims by calling:

var claims = JwtSecurity.GetClaims(jwt);

You can get a specific claim value by specifying the claim:

var customerId = JwtSecurity.GetClaimValue(jwt, JwtSecurity.ClaimCustomerId);

To validate the JWT, call:

JwtSecurity.Validate(jwt);

If it succeeds, it will simply return.  If there is a problem, it
will throw one of the following exceptions:

InvalidOperationException - Library is not properly setup with keys.
JwtValidationException - The supplied JWT token is invalid.
JwtExpiredException - The JWT itself is expired.  However, the JWT may still
    be usable if user's session isn't expired.  If you get this exception,
	you should call JwtSecurity.ValidateLoggedInAsync(jwt) to see if the user
	is logged in.

To validate whether a user is logged in, call:

JwtSecurity.ValidateLoggedInAsync(jwt);

A JWT may be valid and not expired but the user may have explicitly
logged out.  The ValidateLoggedInAsync() method checks that and will simply
return if the user is still logged in.  Otherwise, it will throw one of
the following exceptions:

JwtLoggedOutException - User has logged out and the current JWT should not
    be used.
InvalidOperationException - Unexpected return code from the call to the
    customer auth service.


