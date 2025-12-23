angular.module('myApp').controller('FormsController',
  ['$scope', '$http', function ($scope, $http) {
    var vm = this;

    // Initialize users array
    vm.users = [];

    // Initialize empty user object
    vm.resetUser = function () {
      vm.user = {
        username: '',
        displayName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      };
    };
    // Initialize
    vm.resetUser();
    vm.isEditing = false;
    vm.editingIndex = -1;

    // Save user (Create or Update)
    vm.saveUser = function () {
      if (vm.userForm.$invalid) {
        alert('Please fix form errors before submitting.');
        return;
      }

      if (!vm.isEditing && vm.user.password !== vm.user.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      var userToSave = {
        username: vm.user.username,
        displayName: vm.user.displayName,
        email: vm.user.email,
        phone: vm.user.phone
      };

      if (vm.isEditing) {
        // Update existing user
        vm.users[vm.editingIndex] = angular.copy(userToSave);
        alert('User updated successfully!');
      } else {
        // Add new user (include password for new users)
        userToSave.password = vm.user.password;
        vm.users.push(angular.copy(userToSave));
        alert('User added successfully!');
      }

      vm.clearForm();
    };
    // Edit user
    vm.editUser = function (index) {
      var user = vm.users[index];
      vm.user = {
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        phone: user.phone,
        password: '',
        confirmPassword: ''
      };
      vm.isEditing = true;
      vm.editingIndex = index;

      // Reset form state to pristine since we're loading existing data
      if (vm.userForm) {
        vm.userForm.$setPristine();
        vm.userForm.$setUntouched();
      }
    };

    // Delete user
    vm.deleteUser = function (index) {
      if (confirm('Are you sure you want to delete this user?')) {
        vm.users.splice(index, 1);
        alert('User deleted successfully!');

        // If we're editing the deleted user, clear the form
        if (vm.isEditing && index === vm.editingIndex) {
          vm.clearForm();
        }
      }
    };

    // Reset form to initial state
    vm.resetForm = function () {
      if (vm.isEditing) {
        // Reload the original user data
        vm.editUser(vm.editingIndex);
      } else {
        // Reset to empty form
        vm.resetUser();
        if (vm.userForm) {
          vm.userForm.$setPristine();
          vm.userForm.$setUntouched();
        }
      }
    };

    // Clear form completely
    vm.clearForm = function () {
      vm.resetUser();
      vm.isEditing = false;
      vm.editingIndex = -1;
      if (vm.userForm) {
        vm.userForm.$setPristine();
        vm.userForm.$setUntouched();
      }
    };
  }]);