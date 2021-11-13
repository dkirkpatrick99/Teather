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
bot = User.create({username: "stack_bot", formal_name: "Stack Bot", email: "stackbot@stack.com", password: "nomopojo"})
demo = User.create({username: "DemoUser", formal_name: "Demo User", email: "demouser@gmail.com", password: "pleasehireme"})
me = User.create({username: "Dalton123", formal_name: "Dalton Kirkpatrick", email: "d.kirkpatrick99@gmail.com", password: "hello1"})
jenny = User.create({username: "Jenster", formal_name: "Jenny Morris", email: "jenny@email.com", password: "hello1"})
jairo = User.create({username: "Jairo", formal_name: "Jairo Lombera", email: "jairo@email.com", password: "hello1"})
michael = User.create({username: "Michael", formal_name: "Michael Manotok", email: "michael@email.com",  password: "hello1"})

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
testing = Channel.create({name: "Test Channel", 
                            description: "this is a test channel for testing",
                            admin_id: bot.id})

# Directs seed

jennyToMe = Direct.create({name: "Jenny Dalton"})
jairoToMe = Direct.create({name: "Jairo Dalton"})
jennyToMichael = Direct.create({name: "Jenny Michael"})
jennyToDemo = Direct.create({name: "Jenny Demo"})


# Messages seed

test1 = Message.create({body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus augue eget neque scelerisque efficitur. Aliquam at quam et urna interdum consectetur. Curabitur ultricies metus id eros luctus tempor.",
                            user_id: demo.id,
                            messageable_id: global.id,
                            messageable_type: Channel})
test2 = Message.create({body: "Nunc tempus elementum congue. Sed hendrerit et nulla ac aliquam. Pellentesque ultrices, nunc non ornare mollis, diam justo interdum turpis, vel tristique nulla dolor sed tellus. Donec porta diam ac imperdiet iaculis.",
                            user_id: demo.id,
                            messageable_id: global.id,
                            messageable_type: Channel})
test3 = Message.create({body: "Suspendisse potenti. Cras nec sapien sit amet turpis eleifend bibendum in at ante.",
                            user_id: demo.id,
                            messageable_id: global.id,
                            messageable_type: Channel})
test4 = Message.create({body: "Suspendisse potenti. Cras nec sapien sit amet turpis eleifend bibendum in at ante.",
                            user_id: demo.id,
                            messageable_id: geese.id,
                            messageable_type: Channel})
test5 = Message.create({body: "[] === 0 but [] != []",
                            user_id: demo.id,
                            messageable_id: cheese.id,
                            messageable_type: Channel})
test6 = Message.create({body: "This is Jenny",
                            user_id: jenny.id,
                            messageable_id: global.id,
                            messageable_type: Channel})

#Memberships seed

mem1 = Membership.create({user_id: bot.id, memberable_id: global.id, memberable_type: Channel})
mem2 = Membership.create({user_id: demo.id, memberable_id: global.id, memberable_type: Channel})
mem3 = Membership.create({user_id: me.id, memberable_id: global.id, memberable_type: Channel})
mem3 = Membership.create({user_id: jairo.id, memberable_id: global.id, memberable_type: Channel})
mem4 = Membership.create({user_id: bot.id, memberable_id: geese.id, memberable_type: Channel})
mem5 = Membership.create({user_id: demo.id, memberable_id: geese.id, memberable_type: Channel})
mem6 = Membership.create({user_id: me.id, memberable_id: geese.id, memberable_type: Channel})
mem7 = Membership.create({user_id: bot.id, memberable_id: cheese.id, memberable_type: Channel})
mem8 = Membership.create({user_id: demo.id, memberable_id: cheese.id, memberable_type: Channel})
mem9 = Membership.create({user_id: me.id, memberable_id: cheese.id, memberable_type: Channel})
mem10 = Membership.create({user_id: jenny.id, memberable_id: global.id, memberable_type: Channel})

mem11 = Membership.create({user_id: me.id, memberable_id: jennyToMe.id, memberable_type: Direct})
mem12 = Membership.create({user_id: jenny.id, memberable_id: jennyToMe.id, memberable_type: Direct})

mem13 = Membership.create({user_id: me.id, memberable_id: jairoToMe.id, memberable_type: Direct})
mem14 = Membership.create({user_id: jairo.id, memberable_id: jairoToMe.id, memberable_type: Direct})

mem15 = Membership.create({user_id: jenny.id, memberable_id: jennyToMichael.id, memberable_type: Direct})
mem16 = Membership.create({user_id: michael.id, memberable_id: jennyToMichael.id, memberable_type: Direct})

mem17 = Membership.create({user_id: jenny.id, memberable_id: jennyToDemo.id, memberable_type: Direct})
mem18 = Membership.create({user_id: demo.id, memberable_id: jennyToDemo.id, memberable_type: Direct})




