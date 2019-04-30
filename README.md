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

---

* [Language](#language)
* [List of API services](#list-of-api-services)
  - [Water Usage Logging](#water-usage-logging)
  - [Water Usage Monitoring](#water-usage-monitoring)
  - [Water Usage Analysis](#water-usage-analysis)
  - [Cleanliness Report](#cleanliness-report)
  - [Availability Report](#availability-report)
  - [Cleanliness Command](#cleanliness-command)
  - [Availability Command](#availability-command)
  - [Capacity Sensing](#capacity-sensing)
  - [Capacity Validating](#capacity-validating)
  - [Capacity Data Updating](#capacity-data-updating)
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
As Front-end are written in **HTML,CSS, and ReactJS**

## List of API Services
- Water Usage Loggin
- Water Usage Monitoring
- Water Usage Analysis
- Cleanliness Report
- Availability Report
- Cleanliness Command
- Availability Command
- Capacity Sensing
- Capacity Validating
- Capacity Data Updating
- Notification
- SSO
- Water Pollution Logging
- Water Pollution Monitoring
- Water Pollution Analysis

### **Getting All People**

---

API for getting all registered people.

* **URL**

  ```
  /api/php/people
  ```

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"id_num":"id","first_name":"firstname","last_name":"lastname"}]`

* **Sample Call:**

  ```
  curl -i /api/php/people
  ```

### **Getting Single Person**

---

API for getting single person by id.

* **URL**

  ```
  /api/php/people/:id
  ```

* **Method:**

  `GET`

* **URL Params**

  URL params id needs to be specified.

  **Required:**

  `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"id_num":"id","first_name":"firstname","last_name":"lastname"}`

* **Sample Call:**

  ```
  curl -i /api/php/people/id
  ```

### **Registering Person**

---

API for registering person.

* **URL**

  ```
  /api/php/register
  ```

* **Method:**

  `POST`

* **Data Params**

  Body request should included as mentioned below with the content type of application/x-www-form-urlencoded.

  **Required:**

  `numid=[integer], firstname=[string], lastname=[string]`

* **Success Response:**

  * **Code:** 200 <br />

* **Sample Call:**

  ```
  $.ajax({
    url: "/api/php/register",
    type: "POST",
    dataType: "application/json",
    contentType: "application/x-www-form-urlencoded",
    success: function(data){
      // function if success
    },
    error: function (err) {
      // function if error
    }
  });
  ```

### **Updating Person**

---

API for updating person.

* **URL**

  ```
  /api/php/update/:id
  ```

* **Method:**

  `PUT`

* **URL Params**

  URL params id needs to be specified.

  **Required:**

  `id=[integer]`

* **Data Params**

  Body request should included as mentioned below with the content type of application/x-www-form-urlencoded.

  **Required:**

  `firstname=[string], lastname=[string]`

* **Success Response:**

  * **Code:** 200 <br />

* **Sample Call:**

  ```
  $.ajax({
    url: "/api/php/update/123",
    type: "PUT",
    dataType: "application/json",
    contentType: "application/x-www-form-urlencoded",
    success: function(data){
      // function if success
    },
    error: function (err) {
      // function if error
    }
  });
  ```

### **Deleting Person**

---

API for deleting person.

* **URL**

  ```
  /api/php/delete/:id
  ```

* **Method:**

  `PUT`

* **URL Params**

  URL params id needs to be specified.

  **Required:**

  `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />

* **Sample Call:**

  ```
  $.ajax({
    url: "/api/php/delete/123",
    type: "PUT",
    dataType: "application/json",
    contentType: "application/x-www-form-urlencoded",
    success: function(data){
      // function if success
    },
    error: function (err) {
      // function if error
    }
  });
  ```

## Built With

* [Express](https://expressjs.com/) - The web framework used

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
