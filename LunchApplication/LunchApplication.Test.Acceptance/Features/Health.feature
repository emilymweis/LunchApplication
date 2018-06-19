Feature: Health

@health	
Scenario: Calling Get Health should return Status OK with message "Service is running"
	Given I am calling the health api		  
	When I call get end-point
	Then the return code is ok
	And the $result.status equals OK	
