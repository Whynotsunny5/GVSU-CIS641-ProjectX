# Overview

The Art Gallery platform aims to create an online marketplace connecting artists and art enthusiasts. It provides a digital space for artists to showcase their work while allowing users to browse, appreciate, and purchase art pieces. The platform focuses on fostering artist-audience interaction by emphasizing storytelling behind each creation.

# Software Requirements

This section outlines the functional and non-functional requirements of the Art Gallery platform.

## Functional Requirements

### User Management

| ID  | Requirement |
| :-------------: | :----------: |
| FR1 | Users can register using email and username. |
| FR2 | Upon registration, users should set a password. |
| FR3 | Users can log in using their registered credentials. |
| FR4 | Users can log out of their accounts securely. |
| FR5 | Users can update and manage their profile information. |

### Art Piece Management

| ID  | Requirement |
| :-------------: | :----------: |
| FR6 | User shall be able to upload images of their art pieces. |
| FR7 | Each uploaded art piece should include mandatory fields like title, description, and price. |
| FR8 | Artists shall have the ability to edit the details of their uploaded art pieces at any time. |
| FR9 | The system shall provide a 'delete' functionality for artists to remove their art pieces from the platform. |
| FR10 | Art pieces uploaded by artists must undergo validation for appropriate content and image quality. |

### User Interaction

| ID  | Requirement |
| :-------------: | :----------: |
| FR11 | User is able to see art listing after logging in. |
| FR12 | Users are able to see artist details of a specific art. |
| FR13 | The system shall facilitate direct messaging between buyers and artists for inquiries about specific art pieces. |
| FR14 | Users can be able to open artist profile from a specific art. |
| FR15 | The platform should maintain a record of communication history between buyers and artists for reference. |

### Data Storing

| ID  | Requirement |
| :-------------: | :----------: |
| FR16 | The system stores the user details in the database. |
| FR17 | Users are able to access the stored information. |
| FR18 | The system should guarantee the consistency and correctness of the stored data. |
| FR19 | Regular automated backups of all user-related data, such as user profiles and artwork, should be carried out by the system. |
| FR20 | The system should have a strong recovery mechanism in place to quickly restore data from backups and guarantee that user access and functionality are not adversely affected in the case of data loss or system failure. |

### Image Management

| ID  | Requirement |
| :-------------: | :----------: |
| FR21 | Images are stored in base64 format in the database. |
| FR22 | The system generates pictures randomly from the database. |
| FR23 | Users can add a profile picture to their profile. |
| FR24 | Any user is able to see any other's profile photo displayed in png or jpeg format. |
| FR25 | Pictures or photos displayed are converted from base64 format from the database. |

## Non-Functional Requirements

### Security Measures

| ID  | Requirement |
| :-------------: | :----------: |
| NFR1 | Passwords must be stored in the database for registered login. |
| NFR2 | The system shall enforce strong password policies. |
| NFR3 | Users are able to save credentials in their system. |
| NFR4 | Access to user data should be strictly regulated. |
| NFR5 | Regular security audits and vulnerability assessments should be conducted to ensure data safety. |

### Performance

| ID  | Requirement |
| :-------------: | :----------: |
| NFR6 | The website's average response time for user interactions shall not exceed 3 seconds. |
| NFR7 | Users can see newer posts instantly after pictures are uploaded. |
| NFR8 | Database queries and API calls must be optimized to reduce latency. |
| NFR9 | The system should implement caching mechanisms for frequently accessed data. |
| NFR10 | Regular performance monitoring and optimization should be carried out based on user usage patterns. |

### Scalability

| ID  | Requirement |
| :-------------: | :----------: |
| NFR11 | More user traffic should be supported by the system architecture. |
| NFR12 | Cloud-based infrastructure solutions ought to be utilized for on-demand scalability. |
| NFR13 | Load balancers should disperse traffic among servers equally to avoid overload. |
| NFR14 | In response to demand spikes and traffic patterns, the platform ought to automatically scale. |
| NFR15 | System performance and capacity should be tracked by monitoring tools in order to proactively scale resources. |

### Device Compatibility

| ID  | Requirement |
| :-------------: | :----------: |
| NFR16 | The website should have a responsive design that easily changes to fit different screen sizes. |
| NFR17 | It is important to make sure that all major web browsers are compatible. |
| NFR18 | Users of tablets and smartphones should have access to touch-friendly interfaces. |
| NFR19 | Accessibility features for users with impairments should be supported by the platform. |
| NFR20 | To ensure responsiveness, testing should be done frequently on various devices and screen resolutions. |

### Reliability and Availability

| ID  | Requirement |
| :-------------: | :----------: |
| NFR21 | The system should have an uptime of at least 99.9% to ensure continuous availability. |
| NFR22 | Redundancy measures should be in place to mitigate the risk of system failure. |
| NFR23 | Regular backups of user data should be performed to prevent data loss. |
| NFR24 | The platform should have a failover mechanism to switch to backup servers during outages. |
| NFR25 | Use real-time notifications to warn users as soon as planned maintenance or unplanned downtimes occur, and have open lines of communication about the state of the system. |

# Change management plan

**Training Plan:
* Needs Assessment: Identify user skill levels and specific training needs through surveys or assessments.
* Customized Training Modules: Develop tailored training sessions or modules based on user roles and application features.
* Hands-on Workshops: Conduct interactive workshops or webinars to provide practical experience using the application.
* User Documentation: Create comprehensive user guides, manuals, and FAQs for ongoing reference.
* Continuous Support: Offer ongoing support through help desks, forums, or dedicated support personnel to address user queries or issues post-training.
**Integration with Existing Ecosystem:
*Compatibility Check: Conduct thorough compatibility tests to ensure seamless integration with existing software or systems.
*Pilot Testing: Initiate a pilot phase where a select group of users can test the application within their existing workflows.
*Feedback Mechanism: Establish a feedback loop to gather user input during the pilot phase, addressing any compatibility challenges.
*Customization Options: Offer customization features if needed to align the application with the customer's specific workflow requirements.
**Issue Resolution:
*Bug Tracking System: Implement a robust bug tracking system to monitor and prioritize reported issues.
*Timely Updates: Provide regular updates and patches to address identified issues or bugs.
*Dedicated Support Team: Assign a dedicated support team to swiftly respond to and resolve reported issues.
*User Reporting Mechanism: Enable users to report issues easily through a user-friendly interface or dedicated channels.
**Overall Strategy:
*Change Communication: Communicate the benefits and positive impacts of the new application to gain buy-in from stakeholders and users.
*Change Champions: Identify and empower internal advocates or "champions" who can promote the application's benefits within the organization.
*Gradual Rollout: Implement a phased approach for deployment, starting with small groups and gradually expanding to larger user bases.
*Feedback and Improvement: Continuously gather feedback from users to improve the application's functionality and user experience.
