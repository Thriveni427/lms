import { combineReducers } from "redux";
import { getUsersReducer } from "./getUsersReducer";
import { loginReducer } from "./loginReducer";
import { guestUserRegistrationReducer } from "./guestUserRegistrationReducer";
import { addUserReducer } from "./addUserReducer";
import { editUserReducer } from "./editUserReducer";
import { getVendorReducer } from "./getVendorReducer";
import { addVendorReducer } from "./addVendorReducer";
import { createBatchReducer } from "./createBatchReducer";
import { getBatchListReducer } from "./getBatchListReducer";
import { getCourseListReducer } from "./getCourseListReducer";
import { createCourseReducer } from "./createCourseReducer";
import { editCourseReducer } from "./editCourseReducer";
import { editVendorReducer } from "./editVendorReducer";
import { getMaterialReducer } from "./getMaterialReducer";
import { addMaterialSectionReducer } from "./addMaterialSectionReducer";
import { getCourseSectionReducer } from "./getCourseSectionReducer";
import { editBatchReducer } from "./editBatchReducer";
import { getCategoryListReducer } from "./getCategoryListReducer";
import { addCategoryReducer } from "./addCategoryReducer";
import { getCategoryReducer } from "./getCategoryReducer";
import { editCategoryReducer } from "./editCategoryReducer";
import { createLiveClassReducer } from "./createLiveClassReducer";
import { editLiveClassReducer } from "./editLiveClassReducer";
import { getLiveClassReducer } from "./getLiveClassReducer";
import { getQuestionBankListReducer } from "./getQuestionBankListReducer";
import { getQuestionPaperReducer } from "./getQuestionPaperReducer";
import { getQuestionListReducer } from "./getQuestionListReducer";
import { createQuestionReducer } from "./createQuestionReducer";
import { createQuestionBlankReducer } from "./createQuestionBlankReducer";
import { createQuestionMcqReducer } from "./createQuestionMcqReducer";
import { createQuestionMatchingReducer } from "./createQuestionMatchingReducer";
import { createQuestionTfReducer } from "./createQuestionTfReducer";
import { createQuestionEsaayReducer } from "./createQuestionEsaayReducer";
import { createQuestionPaperReducer } from "./createQuestionPaperReducer";
// import { startTestReducer } from './startTestReducer';
import { bulkUploadReducer } from "./bulkUploadReducer";
import { deleteQuestionReducer } from "./deleteQuestionReducer";
import { editQuestionReducer } from "./editQuestionReducer";
import { getUserCoursesReducer } from "./getUserCoursesReducer";
import { editQuestionBankReducer } from "./editQuestionBankReducer";
import { getLiveClassDetailsReducer } from "./LiveClasses/Users/getLiveClassDetailsReducer";
import { editQuestionPaperReducer } from "./editQuestionPaperReducer";
import { getMaterialBySectionReducer } from "./Courses/Users/getMaterialBySectionReducer";
import { GamificationsReducer } from "./Gamifications/GamificationsReducer";
import { getQuestionsReducer } from "./Courses/Users/getQuestionsReducer";
import { createTopicReducer } from "./createTopicReducer";
import { addSessionReducer } from "./addSessionReducer";
import { getCourseTopicListReducer } from "./getCourseTopicListReducer";
import { getLearnerReducer } from "./Dashboard/getLearnerReducer";
import { getActiveCourseStatusReducer } from "./Dashboard/getActiveCourseStatusReducer";
import { getCourseCompletedStatusReducer } from "./Dashboard/getCourseCompletedStatusReducer";
import { getAllUsersReducer } from "./Courses/Users/getAllUsersReducer";
import { addArtifactsReducer } from "./Courses/addArtifactsReducer";
import { getQuestionReducer } from "./TestPapers/getQuestionReducer";
import { deleteVendorReducer } from "./deleteVendorReducer";
import { setFavoriteIconReducer } from "./setFavoriteIconReducer";
import { startTestReducer } from "./TestPapers/startTestReducer";
import { submitTestReducer } from "./TestPapers/submitTestReducer";
import { getTestResultByQuestionPaperReducer } from "./getTestResultByQuestionPaperReducer";
import { downloadCourseSampleReducer } from "./Courses/downloadCourseSampleReducer";
import { courseExcelUploadReducer } from "./Courses/CourseExcelUploadReducer";
import { getFirstMaterialByCourseReducer } from "./Courses/getFirstMaterialByCourseReducer";
import { getMaterialBySessionReducer } from "./Courses/getMaterialBySessionReducer";
import { startTestByCourseReducer } from "./TestPapers/startTestByCourseReducer";
import { submitCourseTestReducer } from "./TestPapers/submitCourseTestReducer";
import { getTestResultByCourseReducer } from "./getTestResultByCourseReducer";
import { getCurrentTestResultReducer } from "./Courses/Users/getCurrentTestResultReducer";
import { getMaterialByTopicReducer } from "./Courses/getMaterialByTopicReducer";
import { getLearningPathByCategoryReducer } from "./Home/getLearningPathByCategoryReducer";
import { getPopularCoursesReducer } from "./Home/getPopularCoursesReducer";
import { getOverallCoursesReducer } from "./Home/getOverallCoursesReducer";
import { getLearningPathReducer } from "./Home/getLearningPathReducer";
import { getCoursesByCategoryReducer } from "./Home/getCoursesByCategoryReducer";
import { getNestedCategoryReducer } from "./Home/getNestedCategoryReducer";
import { getAllTestResultsForAdminReducer } from "./Courses/Users/getAllTestResultsForAdminReducer";
import { addRemarksByAdminReducer } from "./Courses/Users/addRemarksByAdminReducer";
import { downloadCourseUploadTemplateReducer } from "./Courses/downloadCourseUploadTemplateReducer";
import { uploadQuestionsReducer } from "./Courses/uploadQuestionsReducer";
// import { getCourseDetailsReducer } from "./Home/getCourseDetailsReducer";
import { joinCourseReducer } from "./Courses/Users/joinCourseReducer"
import { getCourseDetailsByIdReducer } from "./Home/getCourseDetailsByIdReducer";
import { addCourseToWishListReducer } from "./Home/addCourseToWishListReducer";
import { getUserCourseWishListReducer } from "./Home/getUserCourseWishListReducer";
import { addLearnersToBatchReducer } from "./addLearnersToBatchReducer"
import { getBatchByIdReducer } from "./getBatchByIdReducer";
import { getUsersFromBatchReducer } from "./getUsersFromBatchReducer";
import { getMyAllBatchesReducer } from "./Batches/getMyAllBatchesReducer";
import { deleteTopicReducer } from "./Courses/deleteTopicReducer";


export default combineReducers({
  getUsersReducer,
  loginReducer,
  addUserReducer,
  editUserReducer,
  getVendorReducer,
  addVendorReducer,
  createBatchReducer,
  getBatchListReducer,
  getCourseListReducer,
  createCourseReducer,
  editCourseReducer,
  editVendorReducer,
  getMaterialReducer,
  addMaterialSectionReducer,
  editBatchReducer,
  getCourseSectionReducer,
  getCategoryListReducer,
  addCategoryReducer,
  getCategoryReducer,
  editCategoryReducer,
  createLiveClassReducer,
  editLiveClassReducer,
  getLiveClassReducer,
  getQuestionBankListReducer,
  getQuestionPaperReducer,
  getQuestionListReducer,
  createQuestionReducer,
  createQuestionBlankReducer,
  createQuestionMcqReducer,
  createQuestionMatchingReducer,
  createQuestionTfReducer,
  createQuestionEsaayReducer,
  // startTestReducer,
  createQuestionPaperReducer,
  bulkUploadReducer,
  editQuestionReducer,
  deleteQuestionReducer,
  getUserCoursesReducer,
  editQuestionBankReducer,
  getLiveClassDetailsReducer,
  editQuestionPaperReducer,
  getMaterialBySectionReducer,
  GamificationsReducer,
  getQuestionsReducer,
  createTopicReducer,
  addSessionReducer,
  getCourseTopicListReducer,
  getLearnerReducer,
  getActiveCourseStatusReducer,
  getCourseCompletedStatusReducer,
  getAllUsersReducer,
  addArtifactsReducer,
  getQuestionReducer,
  deleteVendorReducer,
  setFavoriteIconReducer,
  startTestReducer,
  submitTestReducer,
  getTestResultByQuestionPaperReducer,
  downloadCourseSampleReducer,
  courseExcelUploadReducer,
  getFirstMaterialByCourseReducer,
  getMaterialBySessionReducer,
  startTestByCourseReducer,
  // courseSubmitTestReducer,
  getTestResultByCourseReducer,
  getCurrentTestResultReducer,
  submitCourseTestReducer,
  getMaterialByTopicReducer,
  getLearningPathByCategoryReducer,
  getPopularCoursesReducer,
  getOverallCoursesReducer,
  getLearningPathReducer,
  getAllTestResultsForAdminReducer,
  addRemarksByAdminReducer,
  downloadCourseUploadTemplateReducer,
  uploadQuestionsReducer,
  getCoursesByCategoryReducer,
  getNestedCategoryReducer,
  // getCourseDetailsReducer,
  joinCourseReducer,
  getCourseDetailsByIdReducer,
  guestUserRegistrationReducer,
  addCourseToWishListReducer,
  getUserCourseWishListReducer,
  addLearnersToBatchReducer,
  getBatchByIdReducer,
  getUsersFromBatchReducer,
  getMyAllBatchesReducer,
  deleteTopicReducer
});
