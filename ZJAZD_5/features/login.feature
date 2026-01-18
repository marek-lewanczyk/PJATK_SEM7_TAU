Feature: Login

  @login
  Scenario: TC-001 Should login with valid credentials
    Given I open url "https://the-internet.herokuapp.com/login"
    When I type "tomsmith" into element id "username"
    And I type "SuperSecretPassword!" into element id "password"
    And I click element css "button[type='submit']"
    Then element id "flash" should contain text "You logged into a secure area!"

  @login
  Scenario: TC-002 Should logout correctly
    Given I am logged in to "https://the-internet.herokuapp.com/login" as "tomsmith" with password "SuperSecretPassword!"
    When I click element css 'a[href="/logout"]'
    Then url should contain "/login"
