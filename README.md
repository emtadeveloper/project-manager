<!-- ProjrctManager
  1- Authorization
      - login
         - username , password , login
      - Register
          - username , password , email , mobile
          - validation  , Unique
      - resetPassword
  2- Make Teams
      - Create Team
      - Invite user to team
      - update team
      - Remove user from team
      - Edit team detail
  3- User
      - Profile actions
              -Get Profile  - editprofile
      - Skills
             - Add Skill - edit Skills
      - Invite
             - Accept - reject
      - Create Project
      - Create Team
  4- Skills
      - Create - Edit - Remove - get title for skill
  5- Project
      - Create Project ( title text image team owner tags category)
      - Get all Project
      - Get project by id
      - get team projects
      - get user project
      - update / edit projects
      - remove project

Database :

      - User

             First_name
             Last_name
             Username
             Phone - mobile
             Password
             Email
             Skills  : []
             Team : []
             Role : [ user , admin , teamLeader ]

    - Project

             Title
             Text
             Image
             Tags : []
             Owner : user
             Team : teamId
             private
             show

    - Team

            Title
            Text
            Users
            Projects


-->
