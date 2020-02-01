const rolePermissions1 =[
  {
    module: "DashBoard",
    subModules: [
      {
        name: "DashBoard",
        permissions: {
          Create: false,
          Read: false
        }
      }
    ]
  },
  {
    module: "VendorManagement",
    subModules: [
      {
        name: "Vendors",
        permissions:{
          Create: false,
          Delete: false,
          Edit: false,
          Read: false
        }
      },
      {
        name: "VendorBatches",
        permissions:{
          Create: false,
          Delete: false,
          Edit: false,
          Read: false
        }
      },
      {
        name: "VendorCourses",
        permissions:{
          Create: false,
          Delete: false,
          Edit: false,
          Read: false
        }
      }
    ]
  }
  ,
  {
    module: "Users",
    subModules: [
      {
        name: "CreateUser",
        permissions:{
          Create: false,
          Delete: false,
          Edit: false,
          Read: false
        }
      },
      {
        name: "BulkUpload",
        permissions:{
          Create: false,
          Delete: false,
          Edit: false,
          Read: false
        }
      },      
    {
      name:"Admin",
      permissions:{
        Create: false,
        Delete: false,
        Edit: false,
        Read: false
      }
    },
    {
      name:"EnrolledStudents",
      permissions:{
        Create: false,
        Delete: false,
        Edit: false,
        Read: false
      }
    }
  ]
  },
  {
    module: "Courses",
    subModules: [
      {
        name:"ManageCourse",
        permissions:{
          Create: false,
          Delete: false,
          Edit: false,
          Read: false
        }
      },
      {
        name:"ManageCategory",
        permissions:{
          Create: false,
          Delete: false,
          Edit: false,
          Read: false
        }
      }
    ]
  },
{
  module: "LiveClass",
  subModules: [
    {
      name:"LiveClass",
      permissions:{
        Create: false,
        Delete: false,
        Edit: false,
        Read: false
      }
    },
    {
      name:"ContentLibrary",
      permissions:{
        Create: false,
        Delete: false,
        Edit: false,
        Read: false
      }
    }
  ]
},
{
  module: "Reports",
  subModules: [
    {
      name:"Users",
      permissions:{
        Create: false,
        Delete: false,
        Edit: false,
        Read: false
      }
    },
    {
      name:"CourseEnrollment",
      permissions:{
        Create: false,
        Delete: false,
        Edit: false,
        Read: false
      }
    }
  ]
},
{
  module: "BoradCastMessages",
  subModules: [
    {
      name:"BoradCastMessages",
      permissions:{
        Create: false,
        Delete: false,
        Edit: false,
        Read: false
      }
    }
  ]
},
]

export default rolePermissions1;