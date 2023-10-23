# Vending Machine Program V4

items = [
    # name, price, stock
    ["Candy", 1, 10],
    ["Soda", 2, 5],
    ["Chips", 1.5, 7]
]

try_again = True
while try_again:
  print("Welcome to the vending machine!")
  
  for index, item in enumerate(items):
    name, price, stock = item
    print(f"{index}. {name} (${price})")
  choice = int(input("Please enter the number of the item you want to buy.\n"))

  if 0 <= choice < len(items):
    item = items[choice]
    name, price, stock = item
    if stock > 0:
      stock -= 1
      item[2] = stock
      print(f"You bought {name.lower()}. Enjoy!")
    else:
      print(f"Sorry, we're out of {name.lower()}.")
  else:
    print("Invalid choice.")

  try_again = bool(int(input("Type 1 to try again, 0 to quit.\n")))
