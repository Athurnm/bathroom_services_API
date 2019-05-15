# BATHROOM MANAGEMENT SERVICE PLATFORM
=====================================
## Composite Services:
    1. Bathroom water usage management
    2. Bathroom cleanliness management
    3. Bathroom Availability management

## Developed by:
    1. Athur Naufan M
    2. Akbar Ghifari
    3. Christabel Lawandy E
    4. Qonita Salamah A 

License: Open Source and can be used freely

# BATHROOM MANAGEMENT SERVICE PLATFORM
=======================================

Bathroom Management Service Platform memiliki 13 kandidat layanan yang tergabung dalam 3 service systems yakni Bathroom Availability Management, Bathroom Cleanliness Management, dan Water Usage Management. Platform ini ditunjukan dengan menggunakan web page dan dengan tambahan *Arduino* untuk *support* pada layanan-layanan ini.

**BaseURL : "https://bathroom-manager-api.herokuapp.com"**

---

* [Language](#language)
* [List of API services](#list-of-api-services)
  - [Water Usage Logging](#water-usage-logging)
  - [Water Usage Analysis](#water-usage-analysis)
  - [Cleanliness Report](#cleanliness-report)
  - [Availability Report](#availability-report)
  - [Cleanliness Command](#cleanliness-command)
  - [Availability Command](#availability-command)
  - [Notification](#notification)
  - [SSO](#sso)
  - [Water Pollution Logging](#water-pollution-logging)
  - [Water Pollution Monitoring](#water-pollution-monitoring)
  - [Water Pollution Analysis](#water-pollution-analysis)
* [Built With](#built-with)
* [Authors](#authors)
* [License](#license)
* [Acknowledgments](#acknowledgments)

---

## Language

This services are written in **nodeJS**
As Front-end are written in **HTML,CSS, and PHP**


## List of API Services
- Water Usage Logging 
- Water Usage Analysis
- Cleanliness Report 
- Availability Report 
- Cleanliness Command 
- Availability Command 
- Notification
- SSO
- Water Pollution Logging 
- Water Pollution Monitoring
- Water Pollution Analysis

### **Water Usage Logging**

---

API for saving water usage data from arduino.

* **URL**

  ```
  /https://bathroom-manager-api.herokuapp.com/waterUsageLogging
  ```

* **Method:**

  `POST`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "message": "log created successfully",
    "water_log": {
        "tempCapacity": 1000,
        "usageCapacity": 800,
        "currentCapacity": 200,
        "_id": "5cdb5d3ccfc30f001785a1db",
        "request": {
            "type": "GET",
            "url": "http://localhost:3000/waterUsageLogging5cdb5d3ccfc30f001785a1db"
        }
    }
}`

* **Sample body:**

  ```
  {
	"tempCapacity": 1000,
	"currentCapacity": 200
  }

## Built With

* [Express](https://expressjs.com/) - The web framework used
* []

## Authors

* **Athur Naufan Muharam (18216003)** - [athurnm](https://gitlab.com/Athurnm)
* **Akbar Ghifari (18216011)** - [akbarghifari]()
* **Christabel Eleora L (18216015)** - [christabel5899](https://gitlab.com/christabel5899)
* **Qonita Salamah A (18216023)** - [QonitaS](https://gitlab.com/18216023)

## License

This project is licensed under the MIT License

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
