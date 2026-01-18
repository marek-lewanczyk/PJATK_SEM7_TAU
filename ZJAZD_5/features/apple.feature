Feature: Apple Homepage

  @apple
  Scenario: TC-001 Should load homepage and validate title
    Given I open url "https://www.apple.com"
    Then page title should include "Apple"

  @apple
  Scenario: TC-002 Should open iPhone 17 Pro buy page
    Given I open url "https://www.apple.com/iphone-17-pro/"
    Then url should contain "iphone-17-pro"
