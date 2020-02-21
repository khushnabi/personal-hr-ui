<template>
  <el-container>
    <el-aside width="200px">
      <el-menu :default-openeds="['1','2']">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>Candidates
          </template>
          <el-menu-item index="1-1">
            <router-link tag="li" to="/">Home</router-link>
          </el-menu-item>
          <el-menu-item index="1-2">
            <router-link tag="li" to="/create">Create</router-link>
          </el-menu-item>
          <el-menu-item index="1-3">
            <router-link tag="li" to="/users">Show all</router-link>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>Vacancies
          </template>
          <el-menu-item index="2-1">
            <router-link tag="li" to="/vacancy">Vacancy</router-link>
          </el-menu-item>

          <el-menu-item index="2-2">
            <router-link tag="li" to="/create-vacancy">Create Vacancy</router-link>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>Navigator Three
          </template>
          <el-menu-item-group>
            <template slot="title">Group 1</template>
            <el-menu-item index="3-1">Option 1</el-menu-item>
            <el-menu-item index="3-2">Option 2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group 2">
            <el-menu-item index="3-3">Option 3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">Option 4</template>
            <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>View</el-dropdown-item>
          <el-dropdown-item>Add</el-dropdown-item>
          <el-dropdown-item>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>Tom</span>
    </el-header>
      -->
      <el-main>
        <!-- <app-test></app-test> -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import test from "./components/test";
export default {
  components: {
    "app-test": test
  },
  data() {
    const item = {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles"
    };
    return {
      tableData: Array(20).fill(item)
    };
  }
};
</script>


<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  border: 1px solid #e7e6e6;
}
</style>


