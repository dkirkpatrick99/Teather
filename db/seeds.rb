# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Message.destroy_all
Membership.destroy_all
Channel.destroy_all
User.destroy_all

# Users seed
bot = User.create({username: "stack_bot", password: "nomopojo"})
demo = User.create({username: "DemoUser", password: "pleasehireme"})
me = User.create({username: "Dalton", password: "hello1"})
jenny = User.create({username: "Jenny", password: "hello1"})
jairo = User.create({username: "Jairo", password: "hello1"})
michael = User.create({username: "Michael", password: "hello1"})

# Channels seed

global = Channel.create({name: "Global", 
                            description: "one big chat with everyone in it",
                            admin_id: bot.id})
geese = Channel.create({name: "Goose Talk", 
                            description: "Geese n' stuff",
                            admin_id: bot.id})
cheese = Channel.create({name: "Cheese", 
                            description: "share cool code snippets",
                            admin_id: bot.id})

# Messages seed

test1 = Message.create({body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus augue eget neque scelerisque efficitur. Aliquam at quam et urna interdum consectetur. Curabitur ultricies metus id eros luctus tempor.",
                            user_id: demo.id,
                            channel_id: global.id})
test2 = Message.create({body: "Nunc tempus elementum congue. Sed hendrerit et nulla ac aliquam. Pellentesque ultrices, nunc non ornare mollis, diam justo interdum turpis, vel tristique nulla dolor sed tellus. Donec porta diam ac imperdiet iaculis.",
                            user_id: demo.id,
                            channel_id: global.id})
test3 = Message.create({body: "Suspendisse potenti. Cras nec sapien sit amet turpis eleifend bibendum in at ante.",
                            user_id: demo.id,
                            channel_id: global.id})
test4 = Message.create({body: "Suspendisse potenti. Cras nec sapien sit amet turpis eleifend bibendum in at ante.",
                            user_id: demo.id,
                            channel_id: geese.id})
test5 = Message.create({body: "[] === 0 but [] != []",
                            user_id: demo.id,
                            channel_id: cheese.id})
test6 = Message.create({body: "This is Jenny",
                            user_id: jenny.id,
                            channel_id: global.id})

#Memberships seed

mem1 = Membership.create({user_id: bot.id, channel_id: global.id})
mem2 = Membership.create({user_id: demo.id, channel_id: global.id})
mem3 = Membership.create({user_id: me.id, channel_id: global.id})
mem4 = Membership.create({user_id: bot.id, channel_id: geese.id})
mem5 = Membership.create({user_id: demo.id, channel_id: geese.id})
mem6 = Membership.create({user_id: me.id, channel_id: geese.id})
mem7 = Membership.create({user_id: bot.id, channel_id: cheese.id})
mem8 = Membership.create({user_id: demo.id, channel_id: cheese.id})
mem9 = Membership.create({user_id: me.id, channel_id: cheese.id})
mem10 = Membership.create({user_id: jenny.id, channel_id: global.id})