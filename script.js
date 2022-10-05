var instance = new Vue({
  el: "#app",
  data: {
    //Example Pantry//
    //structure : barcode, cat, name, brand, amount, measure, date
    pantry: [
      ["123", "Dairy", "Cheddar", "Colby", 500, "Grams", "24/12/23"],
      ["124", "Dairy", "Milk", "Pura", 1, "Litre", "22/12/23"],
      ["125", "Meat", "Mince", "Butcher", 1, "Kilogram", "22/11/23"],
      ["126", "Herb", "Oregano", "Homebrand", 150, "Grams", "22/12/23"],
      ["127", "Carbs", "Wholemeal loaf", "Helgas", 350, "Grams", "22/12/23"]
    ],

    //item search variables//
    barcode: "",
    itemCategory: "",
    product: "",
    brand: "",
    amount: "",
    measurement: "",
    searchCriteria: "",
    scanned: false,
    scannedItem: [],
    //array for items (list)//
    shoppingList: [],

    //results array//
    searchResults: []

    //pantry items array: []//
  },
  methods: {
    searchPantry: function () {
      this.searchResults = [];
      var criteria = this.searchCriteria;
      criteria = criteria.toLowerCase();
      for (var i = 0; i < this.pantry.length; i++) {
        if (
          (criteria == this.pantry[i][1].toLowerCase()) |
          (criteria == this.pantry[i][2].toLowerCase())
        ) {
          this.searchResults.push(this.pantry[i]);
        }
      }
      this.searchCriteria = "";
    },

    addPantry: function () {
      if (
        this.barcode != "" &&
        this.itemCategory != "" &&
        this.product != "" &&
        this.brand != "" &&
        this.amount != "" &&
        this.measurement != ""
      ) {
        var tempItem = [];
        var taken = false;
        for (var i = 0; i < this.pantry.length; i++) {
          if (this.barcode == this.pantry[i][0]) {
            taken = true;
            alert("Barcode already in system");
          }
        }
        if (taken == false) {
          tempItem.push(
            this.barcode,
            this.itemCategory,
            this.product,
            this.brand,
            this.amount,
            this.measurement
          );
          this.pantry.push(tempItem);
          this.barcode = "";
          this.itemCategory = "";
          this.product = "";
          this.brand = "";
          this.amount = "";
          this.measurement = "";
        }
      } else {
        alert("All fields must be filled to add item");
      }
      this.bardcode = ""
    },
    
    scanBarcode: function(){
      for(var i = 0; i < this.pantry.length; i++)
        {
          if(this.pantry[i][0] == this.barcode)
            {
              this.scanned= true;
              this.scannedItem = this.pantry[i]
            }
        }
      if(this.scanned==false){
        alert("Item not found")
      }


    },
    takeItem: function() {
      var take = this.amount;
      var item = this.scannedItem;
      if(item[4] - take > 0){
        var remaining = item[4] -= take;
        item[4] = remaining;
        for(var i = 0; i < this.pantry.length; i++)
        {
          if (this.pantry[i][0]== item[0]){
            this.pantry[i]= item;
            alert("Item taken, remaining stock = " + remaining)
          }
        }
      }
      if(item[4] - take == 0){
         for(var i = 0; i < this.pantry.length; i++)
        {
          if (this.pantry[i][0]== item[0]){
            this.pantry.splice(i,1);
            alert("Item taken. No more remaining stock")
          }
      }

      }
            if(item[4] - take < 0){
        alert("Not enough product to take amount")
      
    }
    this.scannedItem = [];
      this.scanned= false;
      this.barcode="";
      this.amount = "";
    
  }
  }
});