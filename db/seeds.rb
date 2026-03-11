posts = [
  { title: "Getting Started with Rails", body: "Rails is a web application framework running on Ruby. It makes building web apps faster and easier.", category: "Rails" },
  { title: "Vue 3 Composition API", body: "The Composition API is a set of APIs that allows us to author Vue components using imported functions.", category: "Vue" },
  { title: "PostgreSQL Tips and Tricks", body: "PostgreSQL is a powerful open source relational database. Here are some tips to get the most out of it.", category: "Database" },
  { title: "Building REST APIs", body: "A REST API is an interface that two computer systems use to exchange information securely over the internet.", category: "Rails" },
  { title: "Vuex State Management", body: "Vuex is a state management pattern and library for Vue.js applications.", category: "Vue" },
  { title: "CSS Grid Layout", body: "CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay content out in rows and columns.", category: "CSS" },
  { title: "Docker for Developers", body: "Docker is a platform for developing, shipping, and running applications in containers.", category: "DevOps" },
  { title: "Introduction to JWT Auth", body: "JSON Web Tokens are an open standard for securely transmitting information between parties as a JSON object.", category: "Security" },
  { title: "Ruby on Rails Best Practices", body: "Following best practices in Rails helps keep your codebase clean, maintainable and scalable.", category: "Rails" },
  { title: "Deploying with Kamal", body: "Kamal is a deployment tool from the Rails team that makes zero-downtime deploys simple.", category: "DevOps" }
]

posts.each do |post|
  Post.find_or_create_by!(title: post[:title]) do |p|
    p.body = post[:body]
  end
end

puts "Seeded #{Post.count} posts"
