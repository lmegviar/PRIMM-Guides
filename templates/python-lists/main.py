import time
import random

# Initialize the player's inventory as an empty list
inventory = []

# Define the player's starting items
starting_items = ["Wooden Sword", "Health Potion"]

# Add the starting items to the inventory
inventory += starting_items

# Define a list of unfound items
unfound_items = ["Gold Coin", "Shield", "Magic Amulet", "Health Elixir", "Map"]

# Introduction
print("Welcome to the RPG Adventure Game!")
time.sleep(1)
print("You are a brave adventurer on a quest to defeat the Larry the Dragon and save the kingdom.")
time.sleep(1)
print("Your adventure begins with a few items in your inventory.")
time.sleep(1)
print(f"Your starting inventory: {inventory}")

# Main game loop
while True:
    print("\nWhat would you like to do?")
    print("1. Explore the forest")
    print("2. Check your inventory")
    print("3. Quit the game")

    choice = input("Enter your choice (1/2/3): ")

    if choice == '1':
        print("\nYou explore the forest...")
        time.sleep(2)

        # Randomly find an item or nothing
        found_item = random.choice(unfound_items + [None])

        if found_item is not None:
            print(f"You found a {found_item}!")
            inventory.append(found_item)
            unfound_items.remove(found_item)
        else:
            print("You found nothing this time.")

        print(f"Your updated inventory: {inventory}")

    elif choice == '2':
        print(f"\nYou open your inventory of {len(inventory)} items:")
        for item in inventory:
            print(f"- {item}")
        if not inventory:
            print("Your inventory is empty.")

    elif choice == '3':
        print("\nThanks for playing! See you on your next adventure.")
        break

    else:
        print("\nInvalid choice. Please enter 1, 2, or 3.")

time.sleep(1)
print("\nGame Over!")
