<script lang="ts">
  import LucideIcon from '$lib/components/common/LucideIcon.svelte';
  import TableRowNotFound from '$lib/components/tables/TableRowNotFound.svelte';
  import DeleteComponent from '$lib/components/ui/delete/DeleteComponent.svelte';
  import Dropdown from '$lib/components/ui/dropdown/Dropdown.svelte';
  import DropdownButton from '$lib/components/ui/dropdown/DropdownButton.svelte';
  import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
  import Col from '$lib/components/ui/grid/Col.svelte';
  import Grid from '$lib/components/ui/grid/Grid.svelte';
  import Modal from '$lib/components/ui/modal/Modal.svelte';
  import ModalBody from '$lib/components/ui/modal/ModalBody.svelte';
  import ModalHeader from '$lib/components/ui/modal/ModalHeader.svelte';
  import ModalTrigger from '$lib/components/ui/modal/ModalTrigger.svelte';
  import ExamQuestionForm from './ExamQuestionForm.svelte';
  import { questionsData } from './question';

  interface QuestionWithShowAll {
    id: number;
    question: string;
    options: string[];
    type: string;
    difficulty: string;
    status: string;
    showAll?: boolean;
  }

  // Questions data for display
  let displayedQuestions: QuestionWithShowAll[] = questionsData.map((question) => ({
    ...question,
    showAll: false // Initialize showAll to false
  }));

  // Search query for filtering questions
  let question: QuestionWithShowAll[] = questionsData;
  let searchQuery: string = '';
  let currentPage = 1;
  let selectedItems: QuestionWithShowAll[] = [];
  let allSelected: boolean = false;
  let filteredQuestion: QuestionWithShowAll[] = question;

  // Toggle selection of individual items
  function toggleItem(question: QuestionWithShowAll) {
    if (selectedItems.includes(question)) {
      selectedItems = selectedItems.filter((item) => item !== question);
    } else {
      selectedItems = [...selectedItems, question];
    }
    allSelected = selectedItems.length === filteredQuestion.length;
  }

  const toggleAll = () => {
    if (allSelected) {
      selectedItems = [];
    } else {
      selectedItems = [...filteredQuestion];
    }
    allSelected = !allSelected;
  };

  const filterQuestion = () => {
    filteredQuestion = question.filter((question) => {
      const searchString = searchQuery.toLowerCase();
      return (
        question.question.toLowerCase().includes(searchString) ||
        question.status.toLowerCase().includes(searchString)
      );
    });
    currentPage = 1; // Reset to first page when filtering
  };
  function deleteSelectedItems() {
    // Remove the selected items from the displayedQuestions list
    displayedQuestions = displayedQuestions.filter((question) => !selectedItems.includes(question));
    selectedItems = [];
    allSelected = false;
  }

  // ---- table activity --------------
  let addForm = false;
  let editMode = false;
  let selectedCustomerDetails: any | null = null;
  function openAddForm() {
    addForm = true;
    editMode = false;
    selectedCustomerDetails = null;
  }

  function overviewData(data: any) {
    selectedCustomerDetails = data;
  }
  function openEditForm(data: any) {
    addForm = false;
    editMode = true;
    selectedCustomerDetails = data;
  }
  function getDataForDelete(data: any) {
    console.log(data);
  }
  function deleteHandler() {
    console.log('deleted');
  }
</script>

<Grid cols={12} class="gap-5 gap-x-space mb-space">
  <Col cols={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }}>
    <div class="relative flex items-center">
      <input
        type="text"
        bind:value={searchQuery}
        on:input={filterQuestion}
        class="border-r-0 rounded-r-none form-input grow focus:border-green-200"
        placeholder="Search for ..."
      />
      <button class="border-green-200 rounded-l-none btn btn-sub-green btn-icon shrink-0">
        <LucideIcon name="Search" class="size-5" /></button
      >
    </div>
  </Col>
  {#if selectedItems.length > 0}
    <button class="btn btn-red btn-icon" on:click={deleteSelectedItems}>
      <LucideIcon name="Trash" class="inline-block size-4" />
    </button>
  {/if}
  <div class="col-span-12 sm:col-span-6 md:col-span-2 xl:col-start-9">
    <div id="sortBySelect" placeholder="Sort By"></div>
  </div>
  <div class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-2">
    <ModalTrigger
      modalId="add-question"
      class="w-full btn"
      text="Create New Question"
      onClick={() => openAddForm()}
    />
  </div>
</Grid>

<div>
  <div class="overflow-x-auto">
    <table class="table border-separate border-spacing-y-2 whitespace-nowrap">
      <tbody>
      <tr class="font-medium text-gray-500">
        <td class="w-11">
          <div class="input-check-group">
            <label for="checkboxAll" class="hidden input-check-label"></label>
            <input
              id="checkboxAll"
              class="input-check input-check-primary"
              type="checkbox"
              bind:checked={allSelected}
              on:click={toggleAll}
            />
          </div>
        </td>
        <td class="">Questions</td>
        <td class="">Option</td>
        <td class="">Item Type</td>
        <td class="">Difficult</td>
        <td class="">Status</td>
        <td class="">Action</td>
      </tr>

      {#each filteredQuestion as question, index (question.id || index)}
        <tr>
          <td
            class="self-start align-top border-t ltr:last:border-r rtl:last:border-l ltr:first:border-l rtl:first:border-r ltr:last:rounded-r-md rtl:last:rounded-l-md ltr:first:rounded-l-md rtl:first:rounded-r-md"
          >
            <div class="input-check-group">
              <label for={'question' + index} class="hidden input-check-label"></label>
              <input
                id={'question' + index}
                class="input-check input-check-primary"
                type="checkbox"
                checked={selectedItems.includes(question)}
                on:click={() => toggleItem(question)}
              />
            </div>
          </td>

          <td
            class="border-t ltr:last:border-r rtl:last:border-l ltr:first:border-l rtl:first:border-r ltr:last:rounded-r-md rtl:last:rounded-l-md ltr:first:rounded-l-md rtl:first:rounded-r-md"
          >
            <h6>
              <a href="#!" on:click|preventDefault={() => (question.showAll = !question.showAll)}>
                {question.question}
              </a>
            </h6>
            {#if question.showAll}
              <div class="mt-3 space-y-2">
                {#each question.options as option, index}
                  <div class="input-radio-group">
                    <input
                      id="qOption-{question.id}-{index}"
                      class="hidden input-radio peer"
                      type="radio"
                      name="optionQ-{question.id}"
                    />
                    <label
                      for="qOption-{question.id}-{index}"
                      class="flex items-center justify-center border border-gray-200 rounded-md text-15 size-9 peer-checked:bg-primary-500 peer-checked:border-primary-500 peer-checked:text-white"
                    >
                      {String.fromCharCode(65 + index)}
                    </label>
                    <label
                      for="qOption-{question.id}-{index}"
                      class="py-1.5 px-3 rounded-md border border-gray-200 input-radio-label grow"
                    >
                      {option}
                    </label>
                  </div>
                {/each}
              </div>
            {/if}
          </td>

          <td
            class="align-top border-t ltr:last:border-r rtl:last:border-l ltr:first:border-l rtl:first:border-r ltr:last:rounded-r-md rtl:last:rounded-l-md ltr:first:rounded-l-md rtl:first:rounded-r-md"
          >
            <a
              href="#!"
              class="link link-primary"
              on:click|preventDefault={() => (question.showAll = !question.showAll)}
            >
              {question.showAll ? 'Hide All' : 'Show All'}
            </a>
          </td>
          <td
            class="align-top border-t ltr:last:border-r rtl:last:border-l ltr:first:border-l rtl:first:border-r ltr:last:rounded-r-md rtl:last:rounded-l-md ltr:first:rounded-l-md rtl:first:rounded-r-md"
            >{question.type}</td
          >
          <td
            class="align-top border-t ltr:last:border-r rtl:last:border-l ltr:first:border-l rtl:first:border-r ltr:last:rounded-r-md rtl:last:rounded-l-md ltr:first:rounded-l-md rtl:first:rounded-r-md"
            >{question.difficulty}</td
          >
          <td
            class="align-top border-t ltr:last:border-r rtl:last:border-l ltr:first:border-l rtl:first:border-r ltr:last:rounded-r-md rtl:last:rounded-l-md ltr:first:rounded-l-md rtl:first:rounded-r-md"
          >
            <span class="badge {question.status === 'New' ? 'badge-green' : 'badge-gray'}">
              {question.status}
            </span>
          </td>
          <td
            class="align-top border-t ltr:last:border-r rtl:border-l ltr:first:border-l rtl:first:border-r ltr:last:rounded-r-md rtl:last:rounded-l-md ltr:first:rounded-l-md rtl:first:rounded-r-md"
          >
            <div>
              <Dropdown>
                <DropdownButton class="flex items-center text-gray-500">
                  <i class="ri-more-2-fill"></i>
                </DropdownButton>
                <DropdownMenu
                  class="fixed z-50 py-2 bg-white rounded-md shadow-lg w-36 dropdown-menu"
                >
                  <ModalTrigger
                    modalId="overview-question"
                    color=""
                    icon="Eye"
                    class="flex items-center px-4 py-1.5 text-gray-500 hover:text-primary-500 text-14 transition duration-300 ease-linear"
                    text="Overview"
                    onClick={() => overviewData(question)}
                  />
                  <ModalTrigger
                    modalId="add-question"
                    color=""
                    icon="Pencil"
                    class="flex items-center px-4 py-1.5 text-gray-500 hover:text-primary-500 text-14 transition duration-300 ease-linear"
                    text="Edit"
                    onClick={() => openEditForm(question)}
                  />
                  <ModalTrigger
                    modalId="delete-file-modal"
                    color=""
                    icon="Trash2"
                    class="flex items-center px-4 py-1.5 text-gray-500 hover:text-red-500 text-14 transition duration-300 ease-linear"
                    text="Delete"
                    onClick={() => getDataForDelete(question)}
                  />
                </DropdownMenu>
              </Dropdown>
              <!-- Add actions like Edit, Delete here -->
            </div>
          </td>
        </tr>
      {/each}

      {#if filteredQuestion.length === 0}
        <tr>
          <td colspan="10" class="!p-8">
            <TableRowNotFound />
          </td>
        </tr>
      {/if}
    </tbody>
    </table>
  </div>
</div>

<!-- exam overview -->
{#if selectedCustomerDetails}
  <Modal modalId="overview-question" let:modalId size=" ">
    <ModalHeader {modalId}><h6 class="modal-title">Review Question</h6></ModalHeader>
    <ModalBody>
      <h6>
        Q{questionsData.findIndex((question) => question.id === selectedCustomerDetails.id) + 1}. {selectedCustomerDetails.question}
      </h6>
      <div class="mt-3 space-y-2">
        {#each selectedCustomerDetails.options as option, index}
          <div class="input-radio-group">
            <input
              id={'qOption' + selectedCustomerDetails.id + index}
              class="hidden input-radio peer"
              type="radio"
              name={'optionQ' + selectedCustomerDetails.id}
            />
            <label
              for={'qOption' + selectedCustomerDetails.id + index}
              class="flex items-center justify-center border border-gray-200 rounded-md text-15 size-9 peer-checked:bg-primary-500 peer-checked:border-primary-500 peer-checked:text-white"
              >{String.fromCharCode(65 + index)}</label
            >
            <label
              for={'qOption' + selectedCustomerDetails.id + index}
              class="py-1.5 px-3 rounded-md border border-gray-200 input-radio-label grow"
              >{option}</label
            >
          </div>
        {/each}
      </div>
    </ModalBody>
  </Modal>
{/if}

<!-- exam details form -->
<Modal modalId="add-question" let:modalId>
  <ModalHeader {modalId}>
    <h6>Add question</h6>
  </ModalHeader>
  <ModalBody>
    <ExamQuestionForm {addForm} {editMode} selectedCustomer={selectedCustomerDetails} />
  </ModalBody>
</Modal>

<!-- exam delete module -->
<DeleteComponent />
